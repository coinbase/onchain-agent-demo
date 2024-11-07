export default function Footer() {
  return (
    <div className="fixed bottom-4 left-4 z-30 text-sm text-zinc-400 bg-black">
      Powered by{' '}
      <a
        href="https://onchainkit.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold transition-colors hover:text-zinc-300"
      >
        OnchainKit
      </a>
      <span className="mx-2">·</span>
      {/* TODO: Replace with a link to the template repo */}
      <a
        href="https://github.com/coinbase/onchain-agent-demo"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-zinc-300"
      >
        Fork this template
      </a>
    </div>
  );
}
