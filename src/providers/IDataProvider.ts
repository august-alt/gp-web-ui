export interface IPolicy {
    id: string;
    [key: string]: any
}

export interface GetListResult <PolicyType extends IPolicy = IPolicy> {
    items: PolicyType[]
}

export interface GetOneParams {
    id: string
}

export interface GetOneResult <PolicyType extends IPolicy = IPolicy> {
    data: PolicyType
}

export type IDataProvider = {
    getList: <PolicyType extends IPolicy = IPolicy> (
        method: string
    ) => Promise<GetListResult<PolicyType>>;

    getOne: <PolicyType extends IPolicy = IPolicy> (
        method: string,
        params: Partial<GetOneParams>
    ) => Promise<GetOneResult<PolicyType>>;
}