import Link from 'next/link';

export default function Page() {
  return (
    <div className="container">
      <h1>Home</h1>
      <div className="mt-3 flex flex-col space-y-2">
        <Link className="text-primary" href="/examples/transfer">
          Example: Transfer
        </Link>
        <Link className="text-primary" href="/examples/server-time">
          Example: Server Time
        </Link>
      </div>
    </div>
  );
}
