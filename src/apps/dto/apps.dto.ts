import { CommonDto } from '../../shared/commonDto';

export class AppsDto extends CommonDto {
  readonly appId: String;
  readonly appType: String;
  readonly appName: String;
  readonly description: String;
  readonly homepage: String;
  readonly publicpage: String;
  readonly isMenuRequired: boolean;
  readonly isApiIntegrator: boolean;
  readonly isPublic: boolean;
  readonly tenantId: String;
}
