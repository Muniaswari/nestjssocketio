
export const google = {
  googleMap: { apiKey: 'AIzaSyCcYiLWdU6JIdokn8_X8Z-v_ceQnvIGCvM' }
};

export const microsoft = {
  map: { apiKey: 'AvVTIOp-CsJp2JkMaiP-jedaYqlC5q31qdbOtTCYVltnOrSnka_2oRcTE2juTmEv' }
}

export const dbconfiguration = {
 // databaseName: 'platformdbProduction',
   databaseName: 'platformdb',
  dbname:
    // Development DB
    //  'mongodb://localhost:27017/platformdb',
    //platformdbProduction
   //'mongodb+srv://mongoadmin:mongoadmin@cluster0-t2z9n.gcp.mongodb.net/platformdbProduction?retryWrites=true&w=majority',
  'mongodb+srv://mongoadmin:mongoadmin@cluster0-t2z9n.gcp.mongodb.net/platformdb?retryWrites=true&w=majority',
  //Production DB
  // 'mongodb+srv://mongoadmin:mongoadmin@cluster0-t2z9n.gcp.mongodb.net/platformdb_prod_new?retryWrites=true&w=majority',
  dbconnetionString: 'DATABASE_CONNECTION',
};

export const schemalist = {
  relationsschema: 'RELATIONS_MODEL',
  userschema: 'USER_MODEL',
  subdomainschema: 'SUBDOMAIN_MODEL',
  metadataschema: 'METADATA_MODEL',
  apiIntegratorschema: 'APIINTEGRATOR_MODEL',
  appsschema: 'APPS_MODEL',
  rolesschema: 'ROELS_MODEL',
  userRoleMappingschema: 'USERROLEMAPPING_MODEL',
  roleFormMappingschema: 'ROLEFORMMAPPING_MODEL',
  roleCompanyMappingschema: 'ROLECOMPANYMAPPING_MODEL',
  companyschema: 'COMPANY_MODEL',
  authschema: 'AUTH_MODEL',
  queriesschema: 'QUERY_MODEL',
  recordschema: 'RECORD_MODEL',
  subscriptionschema: 'SUBSCRIPTION_MODEL',
  workflowschema: 'WORKFLOW_MODEL',
  imageUploadSchema: 'IMAGEUPLOAD_MODEL',
  eventLogsschema: 'EVENTLOGS_MODEL',
};

export const controllers = {
  reportscontroller: ':appId/reports/:formId',
  relationscontroller: 'relations',
  usercontroller: 'user',
  subdomaincontroller: 'subdomains',
  imageController: 'upload',
  metadatacontroller: ':appId/metadata/:type',
  apiintegratorcontroller: 'apiintegrator',
  appscontroller: 'apps',
  publiccontroller: 'public',
  companyscontroller: 'company',
  rolescontroller: 'roles',
  userRoleMappingcontroller: 'userRoleMapping',
  roleFormMappingcontroller: 'roleFormMapping',
  roleCompanyMappingcontroller: 'roleCompanyMapping',
  authcontroller: 'auth',
  tenantcontroller: 'tenant',
  subscriptioncontroller: 'appsubscription',
  queriescontroller: ':tenantId/:companyId/:appId/query',
  widgetcontroller: ':tenantId/:companyId/:appId/widget',
  sectioncontroller: ':tenantId/:companyId/:appId/section',
  listcontroller: ':tenantId/:companyId/:appId/list',
  pagecontroller: ':tenantId/:companyId/:appId/page',
  websitecontroller: ':tenantId/:companyId/:appId/website',
  menucontroller: ':tenantId/:companyId/:appId/menu',
  recordscontroller: ':tenantId/:companyId/:appId/records',
  testappcontroller: 'testapp',
  communicationcontroller: 'communication',
  mailercontroller: 'mailer',
  workflowcontroller: ':tenantId/:companyId/:appId/workflow',
  functioncontroller: ':tenantId/:companyId/:appId/function',
  eventLogscontroller: 'eventlogs',
};

export const models = {
  relationsmodel: 'relations',
  usermodel: 'users',
  subdomainmodel: 'subdomains',
  metadatamodel: 'metadatas',
  apiIntegratormodel: 'apiintegrator',
  appsmodel: 'apps',
  companymodel: 'companies',
  rolesmodel: 'roles',
  userRoleMappingmodel: 'userRoleMapping',
  roleFormMappingmodel: 'roleFormMapping',
  roleCompanyMappingmodel: 'roleCompanyMapping',
  authmodel: 'auth',
  subscriptionsmodel: 'subscriptions',
  queriesmodel: 'queries',
  recordsmodel: 'records',
  workflow: 'workflow',
  imageModel: 'images',
  fileModel: 'files',
  eventLogsModel: 'eventlogs',
};

export const jwtConstants = {
  secret: 'sdfjnkehybxplw',
};

export const constants = {
  uploadPath: 'uploads',
  userImagePath: 'users',
};
