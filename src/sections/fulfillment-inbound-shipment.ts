import { Codec, enumeration, GetInterface, optional, string } from 'purify-ts'

import { ParsingError } from '../error'
import { HttpClient, RequestMeta, Resource } from '../http'
import { ensureArray } from '../parsing'
import { getServiceStatusByResource } from './shared'

const FULFILLMENT_INBOUND_SHIPMENT_API_VERSION = '2010-10-01'

interface GetInboundGuidanceForSKUParameters {
  SellerSKUList: string[]
  MarketplaceId: string
}

enum GuidanceReasonEnum {
  SlowMovingASIN = 'SlowMovingASIN',
  NoApplicableGuidance = 'NoApplicableGuidance',
}

enum InboundGuidanceEnum {
  InboundNotRecommended = 'InboundNotRecommended',
  InboundOK = 'InboundOK',
}

const GuidanceReason = enumeration(GuidanceReasonEnum)
const InboundGuidance = enumeration(InboundGuidanceEnum)

const SKUInboundGuidance = Codec.interface({
  SellerSKU: string,
  ASIN: string,
  InboundGuidance,
  GuidanceReasonList: optional(ensureArray('GuidanceReason', GuidanceReason)),
})

const GetInboundGuidanceForSKU = Codec.interface({
  SKUInboundGuidanceList: ensureArray('SKUInboundGuidance', SKUInboundGuidance),
  InvalidSKUList: optional(string),
})

type GetInboundGuidanceForSKU = GetInterface<typeof GetInboundGuidanceForSKU>

const GetInboundGuidanceForSKUResponse = Codec.interface({
  GetInboundGuidanceForSKUResponse: Codec.interface({
    GetInboundGuidanceForSKUResult: GetInboundGuidanceForSKU,
  }),
})

export class FulfillmentInboundShipment {
  constructor(private httpClient: HttpClient) {}

  async getInboundGuidanceForSku(
    parameters: GetInboundGuidanceForSKUParameters,
  ): Promise<[GetInboundGuidanceForSKU, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetInboundGuidanceForSKU',
      parameters: {
        'SellerSKUList.Id': parameters.SellerSKUList,
        MarketplaceId: parameters.MarketplaceId,
      },
    })

    return GetInboundGuidanceForSKUResponse.decode(response).caseOf({
      Right: (x) => [x.GetInboundGuidanceForSKUResponse.GetInboundGuidanceForSKUResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getServiceStatus() {
    return getServiceStatusByResource(
      this.httpClient,
      Resource.FulfillmentInboundShipment,
      FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
    )
  }
}
