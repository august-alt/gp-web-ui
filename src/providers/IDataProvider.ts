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
        resource: string
    ) => Promise<GetListResult<PolicyType>>;

    getOne: <PolicyType extends IPolicy = IPolicy> (
        resource: string,
        params: Partial<GetOneParams>
    ) => Promise<GetOneResult<PolicyType>>;
}