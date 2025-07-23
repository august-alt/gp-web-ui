interface FileInterface {
    action?: string,
    archive?: boolean,
    executable?: boolean,
    fromPath?: string,
    hidden?: boolean,
    readonly?: boolean,
    suppress?: boolean,
    targetPath?: string
 }

 export type { FileInterface };