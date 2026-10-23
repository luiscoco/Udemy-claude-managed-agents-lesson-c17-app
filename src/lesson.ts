import { text, number, flag, list, object, hash, report, unique, safePath, type Lesson, type Input } from "./core";

// A focused local experiment derived from this lesson’s reviewed presentation.
export const lesson: Lesson = {
  number: 17,
  title: "The Built-in Agent Toolset",
  description: "A tool-enabled agent can do more than produce text: it can inspect files, write revised documents, and run commands. But a completed conversation does not guarantee that your expected output exists.",
  concepts: ["Enable only required built-in tools", "Read-only upload versus output copy", "Verify output bytes"],
  scope: "Checks a local draft artifact and tool configuration. It does not upload or write a file in a provider sandbox. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.",
  cases: [{"id": "0", "label": "Verify the reviewed draft", "input": {"outputText": "Status: reviewed\nAuthor: student", "includeWrite": true}, "expected": "passed", "checks": {"reviewed": true}}, {"id": "1", "label": "Reject an unreviewed draft", "input": {"outputText": "Status: draft", "includeWrite": true}, "expected": "rejected", "checks": {"reviewed": false}}],
  async run(input) {

const tools=[{name:"read",enabled:true,permission:"allow"},{name:"glob",enabled:true,permission:"allow"},{name:"write",enabled:flag(input,"includeWrite"),permission:"ask"}];
const bytes=text(input,"outputText"), reviewed=/^Status: reviewed\s*$/m.test(bytes);
return report(reviewed?"passed":"rejected",reviewed?"The local artifact satisfies the review marker":"The actual content lacks the required marker",{reviewed,sha256:hash(bytes),tools,outputPath:"/mnt/session/outputs/draft.md"},["Keep uploaded input read-only","Plan a separate output copy","Check actual bytes rather than agent claims"]);

  }
};
