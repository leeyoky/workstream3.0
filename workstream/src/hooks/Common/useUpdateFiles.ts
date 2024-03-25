import { useState } from 'react';
import { fetchFileData } from '../../api/axios';
import { fetchFileList } from '../../api/endpoints/notice';
import { serverFileData } from '../../types/File';

/**
 * 첨부파일을 post하는 api
 * @param documentId 문서 고유 id
 * @param docType 문서 category
 * @param files 첨부파일 Array
 * @author Lee,Yeongkyung
 * @date 2024-03-07
 * @returns
 */
const useUpdateFiles = () => {
  const [apiFileList, setApiFileList] = useState<serverFileData[]>([]);

  const updateFileData = async (documentId: string, files: File[], docType: string) => {
    const formData = new FormData();
    // 첨부파일
    files.forEach(file => {
      formData.append('files', file);
    });
    // 문서 카테고리
    formData.append('docType', docType);
    // 문서 고유 id
    formData.append('docNumber', documentId);
    try {
      const response = await fetchFileData(formData);
      const data = response.data;
      console.log('fileData', data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 첨부파일을 서버에서 get하는 api
   * @param id
   * @author Lee,Yeongkyung
   * @date 2024-03-13
   */
  const getFileList = async (id: string) => {
    try {
      const response = await fetchFileList(id);
      const data = response.data.files;
      console.log(data);
      setApiFileList(data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    updateFileData,
    getFileList,
    apiFileList,
    setApiFileList,
  };
};

export default useUpdateFiles;
