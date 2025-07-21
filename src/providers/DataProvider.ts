import {
         type IPolicy,
         type GetListResult,
         type GetOneResult,
         type GetOneParams,
         type IDataProvider
        } from './IDataProvider';

/**
 * DataProvider implementation using fetch API
 */
export class DataProvider implements IDataProvider {
  private static readonly BASE_URL = 'http://localhost:5173/api'; // Update with your actual API endpoint

  /**
   * Fetches a list of policies from the specified resource endpoint
   * @param resource - The resource endpoint to fetch from
   * @returns Promise containing the list of policies
   */
  public async getList<PolicyType extends IPolicy = IPolicy>(
    resource: string
  ): Promise<GetListResult<PolicyType>> {
    try {
      const response = await fetch(`${DataProvider.BASE_URL}/${resource}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch list from ${resource}: ${response.statusText}`);
      }

      const data: PolicyType[] = await response.json();
      return { items: data };
    } catch (error) {
      console.error(`DataProvider.getList error for ${resource}:`, error);
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
    resource: string,
    params: Partial<GetOneParams>
  ): Promise<GetOneResult<PolicyType>> {
    try {
      const id = params.id;
      if (!id) {
        throw new Error('ID parameter is required for getOne operation');
      }

      const response = await fetch(`${DataProvider.BASE_URL}/${resource}/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${resource} with ID ${id}: ${response.statusText}`);
      }

      const data: PolicyType = await response.json();
      return { data };
    } catch (error) {
      console.error(`DataProvider.getOne error for ${resource} ID ${params.id}:`, error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const dataProvider = new DataProvider();
