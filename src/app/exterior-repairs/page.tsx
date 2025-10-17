import ServicePage, { getService } from '@/components/ServicePage';
export const metadata = { title: 'Exterior Repairs | Roof Pro Exteriors' };
export default function Page() { return <ServicePage service={getService('exterior-repairs')} />; }
