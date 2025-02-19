import { GetServerSideProps } from 'next';

export default function Page({ page }) {
  if (!page) return <h1>Page Not Found</h1>;

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/pages?where[slug][equals]=${params.slug}`);
  const data = await res.json();

  return { props: { page: data.docs[0] || null } };
};
