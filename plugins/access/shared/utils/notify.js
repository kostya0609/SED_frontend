import { ElNotification } from 'element-plus'

export const notify = ({title = '', message = '', type = '', duration = 3000} = {}) => {
    ElNotification({
        title,
        message,
        type,
        duration,
        dangerouslyUseHTMLString: true,
    })
};