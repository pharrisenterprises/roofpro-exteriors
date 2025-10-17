import ServicePage, { getService } from '@/components/ServicePage';
export const metadata = { title: 'Siding | Roof Pro Exteriors' };
export default function Page() { return <ServicePage service={getService('siding')} />; }
