import { registerRoutes } from '../providers';
import { DocumentsModule, DirectiveModule, ESZModule, ReviewModule } from '@documents';
import { DocumentRoutesModule } from '@document-routes'
import { ReportModule } from '@report';

/**
 * @type {import("@/common/shared/types").ModuleItem[]}
 */
export const modules = [
	{
		module: DocumentsModule,
		params: {},
	},
	{
		module: DirectiveModule,
		params: {},
	},
	{
		module: ESZModule,
		params: {},
	},
	{
		module: ReviewModule,
		params: {},
	},
	{
		module: DocumentRoutesModule,
		params: {},
	},
	{
		module: ReportModule,
		params: {},
	}
].map(item => ({ ...item, params: { ...item.params, registerRoutes } }));