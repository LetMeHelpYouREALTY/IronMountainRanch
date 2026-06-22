import { generateSiteSchemaGraph } from "@/lib/schema-blueprint";
import { agentInfo, officeInfo } from "@/lib/site-config";

export default function SiteJsonLd() {
  const graph = generateSiteSchemaGraph();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <div className="sr-only" aria-hidden="true">
        <span itemScope itemType="https://schema.org/RealEstateAgent">
          <meta itemProp="name" content={agentInfo.name} />
          <meta itemProp="telephone" content={agentInfo.phoneTel.replace("tel:", "")} />
          <meta itemProp="email" content={agentInfo.email} />
          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <meta itemProp="streetAddress" content={officeInfo.address.street} />
            <meta itemProp="addressLocality" content={officeInfo.address.city} />
            <meta itemProp="addressRegion" content={officeInfo.address.state} />
            <meta itemProp="postalCode" content={officeInfo.address.zip} />
          </span>
        </span>
      </div>
    </>
  );
}
