import {GridRepository} from './GridRepository';
import {NeedActionRepository} from './NeedActionRepository';
import {DocumentTypeRepository} from './DocumentTypeRepository';
import {BasedCreationRepository} from './BasedCreationRepository';
import {ApprovalRoutesRepository} from './ApprovalRoutesRepository';

export const GridRepo = new GridRepository();
export const NeedActionRepo = new NeedActionRepository();
export const DocumentTypeRepo = new DocumentTypeRepository();
export const BasedCreationRepo = new BasedCreationRepository();
export const ApprovalRoutesRepo = new ApprovalRoutesRepository();//