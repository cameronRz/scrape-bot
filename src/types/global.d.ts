import { Identifiable, EditableData, XataRecord } from '@xata.io/client';

export type CreateSiteContentRecord = Omit<EditableData<XataRecord>, 'id'> & Partial<Identifiable>;