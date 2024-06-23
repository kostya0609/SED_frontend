import { getDownLoadLink } from "@common/shared/utils";

export function prepareFiles(files) {
    return files.map(file => ({
        name: file.original_name,
        url: getDownLoadLink(file.id),
        id: file.id,
    }));
};