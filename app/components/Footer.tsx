export default function Footer() {
  return (
    <div className="fixed bottom-4 left-4 text-zinc-400 text-sm z-30">
      Powered by{" "}
      <a
        href="https://onchainkit.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold hover:text-zinc-300 transition-colors"
      >
        OnchainKit
      </a>
      <span className="mx-2">·</span>
      {/* TODO: Replace with a link to the template repo */}
      <a
        href="https://github.com/coinbase/onchain-agent-demo"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-zinc-300 transition-colors"
      >
        Fork this template
      </a>
    </div>
  );
}
