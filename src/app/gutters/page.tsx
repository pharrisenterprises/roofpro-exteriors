import ServicePage, { getService } from '@/components/ServicePage';
export const metadata = { title: 'Gutters | Roof Pro Exteriors' };
export default function Page() { return <ServicePage service={getService('gutters')} />; }
