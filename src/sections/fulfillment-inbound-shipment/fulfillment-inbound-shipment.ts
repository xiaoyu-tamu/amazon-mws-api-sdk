import { ParsingError } from '../../error'
import { HttpClient, RequestMeta, Resource } from '../../http'
import { getServiceStatusByResource } from '../shared'
import {
  ConfirmPreorder,
  ConfirmPreorderResponse,
  CreateInboundShipment,
  CreateInboundShipmentPlan,
  CreateInboundShipmentPlanResponse,
  CreateInboundShipmentResponse,
  GetInboundGuidanceForASIN,
  GetInboundGuidanceForASINResponse,
  GetInboundGuidanceForSKU,
  GetInboundGuidanceForSKUResponse,
  GetPreorderInfo,
  GetPreorderInfoResponse,
  GetPrepInstructionsForASIN,
  GetPrepInstructionsForASINResponse,
  GetPrepInstructionsForSKU,
  GetPrepInstructionsForSKUResponse,
  PutTransportContent,
  PutTransportContentResponse,
  UpdateInboundShipment,
  UpdateInboundShipmentParameters,
  UpdateInboundShipmentResponse,
} from './codec'
import {
  canonicalizeParametersCreateInboUpdateundShipmentPlan,
  canonicalizeParametersCreateUpdateInboundShipment,
  canonicalizePutTransportContentParameters,
  ConfirmPreorderParameters,
  CreateInboundShipmentParameters,
  CreateInboundShipmentPlanParameters,
  GetInboundGuidanceForASINParameters,
  GetInboundGuidanceForSKUParameters,
  GetPreorderInfoParameters,
  GetPrepInstructionsForASINParameters,
  GetPrepInstructionsForSKUParameters,
  PutTransportContentParameters,
} from './type'

const FULFILLMENT_INBOUND_SHIPMENT_API_VERSION = '2010-10-01'

export class FulfillmentInboundShipment {
  constructor(private httpClient: HttpClient) {}

  async putTransportContent(
    parameters: PutTransportContentParameters,
  ): Promise<[PutTransportContent, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'PutTransportContent',
      parameters: canonicalizePutTransportContentParameters(parameters),
    })

    return PutTransportContentResponse.decode(response).caseOf({
      Right: (x) => [x.PutTransportContentResponse.PutTransportContentResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getPrepInstructionsForAsin(
    parameters: GetPrepInstructionsForASINParameters,
  ): Promise<[GetPrepInstructionsForASIN, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetPrepInstructionsForASIN',
      parameters: {
        'ASINList.Id': parameters.ASINList,
        ShipToCountryCode: parameters.ShipToCountryCode,
      },
    })

    return GetPrepInstructionsForASINResponse.decode(response).caseOf({
      Right: (x) => [x.GetPrepInstructionsForASINResponse.GetPrepInstructionsForASINResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getPrepInstructionsForSku(
    parameters: GetPrepInstructionsForSKUParameters,
  ): Promise<[GetPrepInstructionsForSKU, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetPrepInstructionsForSKU',
      parameters: {
        'SellerSKUList.Id': parameters.SellerSKUList,
        ShipToCountryCode: parameters.ShipToCountryCode,
      },
    })

    return GetPrepInstructionsForSKUResponse.decode(response).caseOf({
      Right: (x) => [x.GetPrepInstructionsForSKUResponse.GetPrepInstructionsForSKUResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async confirmPreorder(
    parameters: ConfirmPreorderParameters,
  ): Promise<[ConfirmPreorder, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'ConfirmPreorder',
      parameters: {
        ShipmentId: parameters.ShipmentId,
        NeedByDate: parameters.NeedByDate.toISOString(),
      },
    })

    return ConfirmPreorderResponse.decode(response).caseOf({
      Right: (x) => [x.ConfirmPreorderResponse.ConfirmPreorderResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getPreorderInfo(
    parameters: GetPreorderInfoParameters,
  ): Promise<[GetPreorderInfo, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetPreorderInfo',
      parameters: {
        ShipmentId: parameters.ShipmentId,
      },
    })

    return GetPreorderInfoResponse.decode(response).caseOf({
      Right: (x) => [x.GetPreorderInfoResponse.GetPreorderInfoResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async updateInboundShipment(
    parameters: UpdateInboundShipmentParameters,
  ): Promise<[UpdateInboundShipment, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'UpdateInboundShipment',
      parameters: canonicalizeParametersCreateUpdateInboundShipment(parameters),
    })

    return UpdateInboundShipmentResponse.decode(response).caseOf({
      Right: (x) => [x.UpdateInboundShipmentResponse.UpdateInboundShipmentResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async createInboundShipment(
    parameters: CreateInboundShipmentParameters,
  ): Promise<[CreateInboundShipment, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'CreateInboundShipment',
      parameters: canonicalizeParametersCreateUpdateInboundShipment(parameters),
    })

    return CreateInboundShipmentResponse.decode(response).caseOf({
      Right: (x) => [x.CreateInboundShipmentResponse.CreateInboundShipmentResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async createInboundShipmentPlan(
    parameters: CreateInboundShipmentPlanParameters,
  ): Promise<[CreateInboundShipmentPlan, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'CreateInboundShipmentPlan',
      parameters: canonicalizeParametersCreateInboUpdateundShipmentPlan(parameters),
    })

    return CreateInboundShipmentPlanResponse.decode(response).caseOf({
      Right: (x) => [x.CreateInboundShipmentPlanResponse.CreateInboundShipmentPlanResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

  async getInboundGuidanceForAsin(
    parameters: GetInboundGuidanceForASINParameters,
  ): Promise<[GetInboundGuidanceForASIN, RequestMeta]> {
    const [response, meta] = await this.httpClient.request('POST', {
      resource: Resource.FulfillmentInboundShipment,
      version: FULFILLMENT_INBOUND_SHIPMENT_API_VERSION,
      action: 'GetInboundGuidanceForASIN',
      parameters: {
        'ASINList.Id': parameters.ASINList,
        MarketplaceId: parameters.MarketplaceId,
      },
    })

    return GetInboundGuidanceForASINResponse.decode(response).caseOf({
      Right: (x) => [x.GetInboundGuidanceForASINResponse.GetInboundGuidanceForASINResult, meta],
      Left: (error) => {
        throw new ParsingError(error)
      },
    })
  }

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
