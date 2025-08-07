interface IScriptData {
    path?: string
    arguments?: string
}

interface IScript {
    id?: string
    script?: IScriptData
}

export type { IScript, IScriptData }