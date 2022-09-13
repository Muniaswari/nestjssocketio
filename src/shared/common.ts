import { PagingInput } from "./paging";

export function toParse(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
};

export function toParseArray(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export function processPageInput(page: any, query: any) {
    const filers = { ...(query.filterlist ? toParse(query.filterlist) : {}), ...page }
    const pagingInput = new PagingInput();
    pagingInput.select = query.select ? toParse(query.select) : {};
    pagingInput.filterlist = filers;
    pagingInput.sortlist = query.sortlist ? toParse(query.sortlist) : {};
    pagingInput.currentPage = query.currentPage ? parseInt(query.currentPage) : 1;
    pagingInput.limit = query.limit ? parseInt(query.limit) : 0;
    pagingInput.skip = (pagingInput.currentPage - 1) * pagingInput.limit;
    return pagingInput;
};

export async function findRefence(uiSchema, properties, key, savedData, relationsModel) {
    const propertyType = properties[key]["type"];
    const uiProperty = uiSchema[key];
    if (uiProperty) {
        if (propertyType === "array") {
        }
        else {
            const uiPropertyOptions = uiProperty.hasOwnProperty("ui:options") && uiProperty["ui:options"];
            if (uiPropertyOptions) {
                await this.addReferenceToDB(uiPropertyOptions, key, savedData, relationsModel);
            }
        }
    }
    return '';
}

export async function findRefenceforArray(uiSchema, properties, key, savedData, relationsModel) {
    const subProperties = properties[key]["items"]["properties"];
    const subUiProperties = uiSchema[key]["items"];
    return await Promise.all(Object.keys(subProperties).map(async (subkey) => {
        const uiPropertyOptions = subUiProperties[subkey] && subUiProperties[subkey].hasOwnProperty("ui:options") && subUiProperties[subkey]["ui:options"];
        return uiPropertyOptions ? await this.addReferenceToDB(uiPropertyOptions, key + "." + subkey, savedData, relationsModel) : null;
    }));
}

export async function addReferenceToDB(uiPropertyOptions, key, savedData, relationsModel) {
    const { lookupForm, lookupField, query } = uiPropertyOptions;
    if (!query && lookupForm) {
        const relationData: any = await relationsModel.find({
            formId: lookupForm,
            appId: savedData.appId,
            "referenceFormDetials.childFormName": savedData.id,
            "referenceFormDetials.foreignColumnName": key,
            "referenceFormDetials.primaryColumnName": lookupField,
        });
        console.log(relationData);
        if (!relationData || relationData.length === 0) {
            const data: any = {
                childFormName: savedData.id,
                foreignColumnName: key,
                primaryColumnName: lookupField
            }
            return await relationsModel.findOneAndUpdate({ formId: lookupForm, appId: savedData.appId, }, {
                "$push": {
                    'referenceFormDetials': data
                }
            }, { upsert: true, new: true, useFindAndModify: true }).exec();
        }
    }
}

export async function addReference(savedData, relationalModel) {
    if (savedData.type === 'form') {
        const formSchema = toParse(savedData.definition.formSchema);
        const uiSchema = toParse(savedData.definition.uiSchema);
        const properties = formSchema.properties;
        await Promise.all(Object.keys(properties).map(async (key) => {
            console.log(properties[key]);
            const propertyType = properties[key]["type"];
            if (propertyType === "array") {
                return await this.findRefenceforArray(uiSchema, properties, key, savedData, relationalModel);
            }
            else return await this.findRefence(uiSchema, properties, key, savedData, relationalModel);
        }));
    }
}