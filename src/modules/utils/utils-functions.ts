export const parseDataWithMapper = async (data: any[], mapper: any) => {
    return await Promise.all(data.map((t) => mapper(t)));
};
