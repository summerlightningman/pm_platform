import axios from "axios";

export const URL = 'http://localhost:8000/';

const transport = axios.create({
    withCredentials: true,
    'Access-Control-Allow-Origin': URL
})

export const login = async data => transport.post(URL + 'login', data);

export const getUserData = async () => transport.get(URL + 'user');

export const uploadLog = async (data, onUploadProgress) =>
    transport.post(URL + 'upload', data, {onUploadProgress});

export const updateColumnNames = async data => transport.post(URL + 'updatecolumnnames', data);

export const updateAlgorithm = async data => transport.post(URL + 'updatealgorithm', data);

export const apply = async data => transport.post(URL + 'apply', data);

export const getImageURL = src => URL + 'image/' + src;

export const getGallery = async () => transport.get(URL + 'gallery');

export const deleteGraph = async data => transport.post(URL + 'delete', data);

export const getClusters = async data => transport.post(URL + 'runcluster', data);

export const getLogCSV = async data => transport.post(URL + 'getdownloadloglink', data);

export const getDownloadLogLink = filename => URL + 'downloadlog/' + filename;

export const test = async data => transport.post(URL + 'test', data);