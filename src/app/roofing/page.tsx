import ServicePage, { getService } from '@/components/ServicePage';

export const metadata = { title: 'Roofing | Roof Pro Exteriors' };

export default function Page() {
  return <ServicePage service={getService('roofing')} />;
}
