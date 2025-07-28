import {
         type IPolicy,
         type GetListResult,
         type GetOneResult,
         type GetOneParams,
         type CreateParams,
         type CreateResult,
         type UpdateParams,
         type UpdateResult,
         type DeleteParams,
         type DeleteResult,
         type IDataProvider
        } from './IDataProvider';

/**
 * DataProvider implementation using fetch API
 */
export class DataProvider implements IDataProvider {
  private static readonly BASE_URL = 'http://localhost:5173/api'; // Update with your actual API endpoint
  private static operation_id = 0;

  /**
   * Fetches a list of policies from the specified resource endpoint
   * @param resource - The resource endpoint to fetch from
   * @returns Promise containing the list of policies
   */
  public async getList<PolicyType extends IPolicy = IPolicy>(
    method: string,
    policyType: number
  ): Promise<GetListResult<PolicyType>> {
    try {
      const response = await fetch(`${DataProvider.BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" } ,
        body: JSON.stringify({ jsonrpc: "2.0", method: method, params: { policyType: policyType, policyId: "123" }, id: ++DataProvider.operation_id })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch list from ${method}: ${response.statusText}`);
      }

      const data: PolicyType[] = await response.json();
      return { items: data };
    } catch (error) {
      console.error(`DataProvider.getList error for ${method}:`, error);
      throw error;
    }
  }

  /**
   * Fetches a single policy by ID from the specified resource endpoint
   * @param resource - The resource endpoint to fetch from
   * @param params - Parameters containing the policy ID
   * @returns Promise containing the single policy
   */
  public async getOne<PolicyType extends IPolicy = IPolicy>(
    method: string,
    params: GetOneParams
  ): Promise<GetOneResult<PolicyType>> {
    try {
      const id = params.id;
      if (!id) {
        throw new Error('ID parameter is required for getOne operation');
      }

      const response = await fetch(`${DataProvider.BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" } ,
        body: JSON.stringify({ jsonrpc: "2.0", method: method, params: { id: id }, id: ++DataProvider.operation_id })
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${method} with ID ${id}: ${response.statusText}`);
      }

      const data: PolicyType = await response.json();
      return { data };
    } catch (error) {
      console.error(`DataProvider.getOne error for ${method} ID ${params.id}:`, error);
      throw error;
    }
  }
  /**
   * Creates a new policy
   * @param method - The API method to call
   * @param params - Parameters containing the policy data
   * @returns Promise containing the creation result
   */
  public async create(
    method: string,
    policyType: number,
    params: CreateParams,
  ): Promise<CreateResult> {
    try {
      const response = await fetch(`${DataProvider.BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: method,
          params: { data: params.data, policyType: policyType, policyId: "123" },
          id: ++DataProvider.operation_id
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create ${method}: ${response.statusText}`);
      }

      await response.json();
      return;
    } catch (error) {
      console.error(`DataProvider.create error for ${method}:`, error);
      throw error;
    }
  }

  /**
   * Updates an existing policy
   * @param method - The API method to call
   * @param params - Parameters containing the policy ID and data
   * @returns Promise containing the update result
   */
  public async update(
    method: string,
    policyType: number,
    params: UpdateParams,
  ): Promise<UpdateResult> {
    try {
      const id = params.id;
      if (!id) {
        throw new Error('ID parameter is required for update operation');
      }

      const response = await fetch(`${DataProvider.BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: method,
          params: { id: id, data: params.data, policyType: policyType, policyId: "123" },
          id: ++DataProvider.operation_id
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update ${method} with ID ${id}: ${response.statusText}`);
      }

      await response.json();
      return;
    } catch (error) {
      console.error(`DataProvider.update error for ${method} ID ${params.id}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a policy by ID
   * @param method - The API method to call
   * @param params - Parameters containing the policy ID
   * @returns Promise containing the delete result
   */
  public async delete(
    method: string,
    policyType: number,
    params: DeleteParams
  ): Promise<DeleteResult> {
    try {
      const id = params.id;
      if (!id) {
        throw new Error('ID parameter is required for delete operation');
      }

      const response = await fetch(`${DataProvider.BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: method,
          params: { id: id, policyType: policyType, policyId: "123" },
          id: ++DataProvider.operation_id
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${method} with ID ${id}: ${response.statusText}`);
      }

      await response.json();
      return;
    } catch (error) {
      console.error(`DataProvider.delete error for ${method} ID ${params.id}:`, error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const dataProvider = new DataProvider();
