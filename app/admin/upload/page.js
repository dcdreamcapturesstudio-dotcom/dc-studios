import { categories } from '../../../lib/constants';
import AdminUploadClient from './AdminUploadClient';

export default function UploadPage() {
  return <AdminUploadClient categories={categories} />;
}
