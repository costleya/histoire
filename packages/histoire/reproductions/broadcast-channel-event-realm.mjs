import { randomUUID } from 'node:crypto'
import { JSDOM } from 'jsdom'
import { KEYS } from '../src/node/dom/dom-keys.ts'

async function main() {
  const dom = new JSDOM('<!DOCTYPE html>')
  const skipKeys = ['window', 'self', 'top', 'parent']
  const keys = new Set(KEYS.concat(Object.getOwnPropertyNames(dom.window))
    .filter((key) => {
      if (skipKeys.includes(key)) return false
      if (key in globalThis) return KEYS.includes(key)
      return true
    }))
  const originals = new Map()

  for (const key of keys) {
    if (KEYS.includes(key) && key in globalThis) {
      originals.set(key, Object.getOwnPropertyDescriptor(globalThis, key))
    }
    Object.defineProperty(globalThis, key, {
      get: () => dom.window[key],
      configurable: true,
    })
  }

  const name = `histoire-${randomUUID()}`
  const sender = new BroadcastChannel(name)
  const receiver = new BroadcastChannel(name)

  try {
    const received = new Promise((resolve, reject) => {
      receiver.addEventListener('message', event => resolve(event.data), { once: true })
      setTimeout(() => reject(new Error('Timed out waiting for BroadcastChannel')), 2_000)
    })

    sender.postMessage('ping')
    await received
  }
  finally {
    sender.close()
    receiver.close()
    dom.window.close()

    for (const key of keys) delete globalThis[key]
    for (const [key, descriptor] of originals) {
      Object.defineProperty(globalThis, key, descriptor)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
