import { redirect } from "next/navigation";

export default function SingularItineraryRedirect({ params }: { params: { slug: string } }) {
  redirect(`/itineraries/${params.slug}`);
}
