import { chromium } from 'playwright-core';
import fs from 'node:fs';
const exe=process.env.HOME+'/.hermes/tools/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b=await chromium.launch({executablePath:exe});
const ctx=await b.newContext({viewport:{width:1280,height:720},recordVideo:{dir:'vid',size:{width:1280,height:720}}});
const p=await ctx.newPage();
await p.goto('file://'+process.cwd()+'/demo.html');
for (const [i,ms] of [[0,4000],[1,4000],[2,5000],[3,4000]]) { await p.evaluate(i=>show(i),i); await p.waitForTimeout(ms); }
await ctx.close(); await b.close();
