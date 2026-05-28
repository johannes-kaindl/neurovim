export class TFile {
  path: string;
  basename: string;
  constructor(path: string) {
    this.path = path;
    this.basename = path.split('/').pop()!.replace('.md', '');
  }
}

export class Plugin {
  app: any;
  constructor() { this.app = {}; }
}

export class MarkdownView {
  editor: any = null;
}

export class WorkspaceLeaf {
  view: any = null;
}

export class App {
  workspace: any = {};
}
