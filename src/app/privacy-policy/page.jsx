export const metadata = {
  title: "Block Blaster Privacy Policy",
  description: "Privacy Policy for the Block Blaster mobile game",
};

const sections = [
  {
    title: "Summary",
    content: (
      <p>
        This Privacy Policy explains how the Block Blaster mobile game, published as <strong>com.getimagin.blockpuzzlebluster</strong>, handles information. The game does not require an account, does not use analytics, and does not use a game server. Publisher-controlled services: <strong>None</strong>.
      </p>
    ),
  },
  {
    title: "Information Stored",
    content: (
      <p>
        Block Blaster stores your progress, scores, and game settings locally on your device. The publisher does not receive this locally stored game data through a publisher-operated service.
      </p>
    ),
  },
  {
    title: "Advertising and Consent",
    content: (
      <p>
        The Android version of Block Blaster uses Google Mobile Ads and Google User Messaging Platform. Google and its partners may process advertising-related and consent-related information, such as information needed to show ads or remember your advertising choices, according to their own policies. Ads are optional, do not block gameplay, and may be unavailable.
      </p>
    ),
  },
  {
    title: "Service Providers",
    content: (
      <p>
        Publisher-controlled services are: <strong>None</strong>. The Android version relies on Google Mobile Ads and Google User Messaging Platform for advertising and consent functionality. Those services are operated by Google and may process information as described in Google&apos;s applicable policies.
      </p>
    ),
  },
  {
    title: "Children's Privacy",
    content: (
      <p>
        Block Blaster does not require an account. We do not knowingly collect personal information directly from players through a publisher-controlled service. This policy does not make a separate certification or claim about children&apos;s privacy compliance. Parents and guardians should review the settings and policies provided by the platform and third-party services used on their device.
      </p>
    ),
  },
  {
    title: "Data Retention and Deletion",
    content: (
      <p>
        Locally stored progress, scores, and settings remain on your device until they are removed. You can delete this local data by clearing the app&apos;s storage or uninstalling Block Blaster. Because there are no publisher-controlled services, the publisher does not retain a server-side copy of this game data.
      </p>
    ),
  },
  {
    title: "Security",
    content: (
      <p>
        We take reasonable steps within the scope of our control to avoid collecting unnecessary information. Local data security also depends on the security of your device and operating system. Third-party services are responsible for the security of information they process under their own policies.
      </p>
    ),
  },
  {
    title: "Changes",
    content: (
      <p>
        We may update this Privacy Policy when the game or its data practices change. The updated policy will be posted on this page with a revised effective date when appropriate.
      </p>
    ),
  },
  {
    title: "Contact",
    content: (
      <p>
        Questions about this Privacy Policy can be sent to <a className="text-[#24CFA6] underline underline-offset-4" href="mailto:getimagin@gmail.com">getimagin@gmail.com</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-[#d2d2d2]">
      <article className="mx-auto max-w-4xl px-5 pb-20 pt-16 sm:px-8 md:px-12 md:pt-24">
        <header className="mb-14 border-b border-[#24CFA6]/30 pb-10">
          <p className="mb-5 fontneue text-sm uppercase tracking-[0.18em] text-[#24CFA6]">Block Blaster</p>
          <h1 className="mb-6 text-4xl leading-tight md:text-6xl">Privacy Policy</h1>
          <p className="max-w-2xl fontspring text-2xl leading-relaxed text-white md:text-3xl">
            A clear overview of how the game handles local data, advertising, and consent.
          </p>
          <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="fontneue uppercase tracking-wider text-[#24CFA6]">Effective date</dt>
              <dd className="mt-1 text-white">September 10, 2026</dd>
            </div>
            <div>
              <dt className="fontneue uppercase tracking-wider text-[#24CFA6]">Publisher</dt>
              <dd className="mt-1 break-all text-white">com.getimagin.blockpuzzlebluster</dd>
            </div>
          </dl>
        </header>

        <div className="space-y-10 text-base leading-8 md:text-lg">
          {sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="mb-3 fontneue text-2xl text-white md:text-3xl">
                <span className="mr-3 text-[#24CFA6]">{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </h2>
              {section.content}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}