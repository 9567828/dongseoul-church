import Vision from "./(screen)/Vision";

export const metadata = {
  title: "5대 비전",
};

export default function Page() {
  return (
    <div className="inner">
      <Vision start={0} end={2} addClass="top" />
      <Vision start={2} />
    </div>
  );
}
