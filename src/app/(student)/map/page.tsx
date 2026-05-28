import { MapFilters } from "@/components/map/MapFilters";
import { NearbyList } from "@/components/map/NearbyList";
import { TeacherMap } from "@/components/map/TeacherMap";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function MapPage() {
  return (
    <PageWrapper className="max-w-7xl">
      <div className="mb-4">
        <h1 className="font-heading text-3xl font-extrabold text-ink-800">Teacher Map</h1>
        <div className="mt-4"><MapFilters /></div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <TeacherMap />
        <NearbyList />
      </div>
    </PageWrapper>
  );
}
