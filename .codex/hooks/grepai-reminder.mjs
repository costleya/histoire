#!/usr/bin/env node

import { readHookPayload } from './lib/hook-payload.mjs'

const REMINDER = 'Consider using GrepAI before running broad search commands.'

const inspectionCommandPattern = /\b(?:rg|grep|find|cat|sed|nl|head|tail|less)\b/

readHookPayload().then((payload) => {
  const command = String(payload?.tool_input?.command ?? '')

  if (!inspectionCommandPattern.test(command)) {
    return
  }

  process.stdout.write(
    `${JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext: REMINDER,
      },
    })}\n`,
  )
})
