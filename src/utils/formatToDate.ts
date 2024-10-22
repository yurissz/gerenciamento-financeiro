import { format } from "date-fns";

export const formatDate = (data: string) => {
    if (typeof data !== 'string' || !data) {
        return 'Data inválida';
    }
    const dataAtual = new Date(data);
    return format(dataAtual, 'dd/MM/yyyy');
}