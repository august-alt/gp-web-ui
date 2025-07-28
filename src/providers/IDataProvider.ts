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

export interface CreateParams <T = any> {
    data: T
}

export type CreateResult = void;

export interface UpdateParams <T = any> {
    id: string
    data: T
}

export type UpdateResult = void;

export interface DeleteParams {
    id: string
}

export type DeleteResult = void;

export type IDataProvider = {
    getList: <PolicyType extends IPolicy = IPolicy> (
        method: string,
        policyType: number
    ) => Promise<GetListResult<PolicyType>>;

    getOne: <PolicyType extends IPolicy = IPolicy> (
        method: string,
        params: GetOneParams
    ) => Promise<GetOneResult<PolicyType>>;

    create: (
        method: string,
        policyType: number,
        params: CreateParams,
    ) => Promise<CreateResult>;

    update: (
        method: string,
        policyType: number,
        params: UpdateParams,
    ) => Promise<UpdateResult>;

    delete: (
        method: string,
        policyType: number,
        params: DeleteParams
    ) => Promise<DeleteResult>;
}