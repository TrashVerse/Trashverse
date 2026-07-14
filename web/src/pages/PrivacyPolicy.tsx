import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
  return (
    <section>
      <div className="pt-20">
        <Navbar />
      </div>
      <section
        className="relative bg-cover bg-center bg-no-repeat h-460"
        style={{ backgroundImage: "url('/images/logo.png')" }}
      >
        <div className="container-x max-w-3xl mx-auto">
          <h1 className="text-xl font-semibold mb-25">Privacy Policy For Trashverse</h1>

          <p className="text-m text-gray-600 mt-25 mb-10%">
            Effective Date: February 12, 2026 <br />
            Effective Date: February 12, 2026
          </p>

          <p className="mt-10 mb-6">
            Welcome to Trashverse (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are
            committed to protecting your privacy and ensuring that your personal data is handled in a
            safe and responsible manner. <br />
            This Privacy Policy outlines how we collect, use, and protect your information when you
            visit our website and use our services
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">1. Information we collect</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Personal Indenntification Information:</strong>
              <p>Name, email address, phone number and physical address.</p>
            </li>
            <li>
              <strong>Transaction Data:</strong>
              <p>Waste materials traded, credits earned and payout details.</p>
            </li>
            <li>
              <strong>Technical Data:</strong>
              <p>IP address, browser type and usage data collected via cookies.</p>
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>

          <ul className="list-disc pl-6 space-y-3">
            <li>To manage waste collection and track &quot;waste-to-wealth&quot; credits.</li>
            <li>To communicate updates, promotions and service changes.</li>
            <li>To improve website proformance and user experience.</li>
            <li>To comply with legal obligations under Nigerian law.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">3. Data Sharing and Disclosure</h2>
          <p className="mb-4">We do not sell your personal data. we may share information with:</p>
          <ul className="list-disc pl-6 spaye-y-3">
            <li>Service Providers assisting with logistics, payment processing, or analytics.</li>
            <li>Legal authorities if required by law.</li>
          </ul>
          <h2 className="text-xl font-semibold mt-8 mb-3">4. Data Security</h2>
          <p className="mb-4">
            We implement technical and organizational measures, including encryption and secure
            servers, to protect your personal data.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights (NDPA Compliance)</h2>
          <p className="mb-4">
            In accordance with the Nigeria Data Protection Act (NDPA), you have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li>Access your personal data.</li>
            <li>Request deletion under certain conditions</li>
            <li>Withdraw consent at anytime</li>
            <li>Correct inaccurate information</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookies</h2>
          <p>
            Our Website uses cookies to enhance your browsing experience. You may disable cookies in
            your browser settings
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Significant changes will be communicated
            through our website or email.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact Us</h2>
          <p className="mb-20">
            <strong>Email:</strong>Trashverserecycling@gmail.com
          </p>
          <p className="mb-2">
            <strong>Phone:</strong>+2348126727596
          </p>
          <p className="mb-2">
            <strong>Address:</strong>No. 10 Chief Ubani Street, off Obikabia Junction, Aba, Nigeria
          </p>
        </div>
      </section>
    </section>
  );
}
