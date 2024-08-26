import { ProcessRepository } from "./ProcessRepository";
import { TemplateRepository } from "./TemplateRepository"
import { UserRepository } from "./UserRepository";
import { TypeRepository } from "./TypeRepository";
import { ParticipantRepository } from "./ParticipantRepository";
import { InteractionCommentRepository } from "./InteractionCommentRepository";
import { FactoryRepository } from "./FactoryRepository";

export const useInitRepositories = (optionsAPI) => {
	const repositories = {
		ProcessRepo: new ProcessRepository(),
		TemplateRepo: new TemplateRepository(),
		UserRepo: new UserRepository(),
		TypeRepo: new TypeRepository(),
		ParticipantRepo: new ParticipantRepository(),
		InteractionCommentRepo: new InteractionCommentRepository(),
		FactoryRepo: new FactoryRepository(),
	};

	Object.keys(repositories).forEach(repoName => {
		optionsAPI.DEV_URL && repositories[repoName].setDevUrl(optionsAPI.DEV_URL);
		optionsAPI.PROD_URL && repositories[repoName].setProdUrl(optionsAPI.PROD_URL);
	});

	return repositories;
};