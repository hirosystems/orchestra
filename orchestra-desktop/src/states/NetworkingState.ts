import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../stores/root";
import { ClarityAbiType, Contract } from "../types";
import {
  BlockIdentifier,
  StacksNFTBurnEventData,
  StacksNFTMintEventData,
  StacksNFTTransferEventData,
  StacksFTBurnEventData,
  StacksFTMintEventData,
  StacksFTTransferEventData,
  StacksTransactionEventType,
  TransactionIdentifier,
  StacksBlock,
  BitcoinBlock,
} from "../types/clarinet";

export enum ActiveFeature {
  StateExplorer,
}

export type StateExplorerStateUpdateWatch = Record<
  "StateExplorerWatch",
  StateExplorerStateUpdateWatchData
>;
export type StateExplorerStateUpdateInit = Record<
  "StateExplorerInitialization",
  StateExplorerStateUpdateInitData
>;
export type BootNetwork = Record<"BootNetwork", BootNetworkData>;
export type OpenProtocol = Record<"OpenProtocol", ProtocolData>;
export type FatalError = Record<"FatalError", String>;

export interface StateExplorerStateUpdate {
  update:
    | StateExplorerStateUpdateWatch
    | StateExplorerStateUpdateInit
    | BootNetwork
    | OpenProtocol
    | FatalError;
}

export interface StateExplorerStateUpdateInitData {
  contracts: Array<Contract>;
}

export type VarValues = Record<"Var", VarValuesData>;
export type MapValues = Record<"Map", MapValuesData>;
export type NftValues = Record<"Nft", NftValuesData>;
export type FtValues = Record<"Ft", FtValuesData>;

export interface StateExplorerStateUpdateWatchData {
  stacks_blocks: Array<StacksBlock>;
  bitcoin_blocks: Array<BitcoinBlock>;
  contract_identifier: string;
  field_name: string;
  field_values: VarValues | MapValues | NftValues | FtValues;
}

export interface BootNetworkData {
  status: string;
  bitcoin_chain_height: number;
  stacks_chain_height: number;
  protocol_deployed: boolean;
  contracts: Array<Contract>;
  protocol_id: number;
  protocol_name: string;
}

export interface NetworkControlCommandData {
  toggle_auto_mining: boolean;
  invalidate_chain_tip: boolean;
  mine_block: boolean;
}

export interface ProtocolData {
  contracts: Array<Contract>;
  protocol_name: string;
}

export enum StateExplorerState {
  None = "None",
  BootNetwork = "BootNetwork",
  NetworkControl = "NetworkControl",
  Initialization = "StateExplorerInitialization",
  Sleep = "StateExplorerSleep",
  Watch = "StateExplorerWatch",
}

export interface Request {
  protocol_id: number;
  request: any;
}

export interface BootNetworkState {
  manifest_path: string;
}

export interface StateExplorerInitializationState {
  manifest_path: string;
}

export interface StateExplorerPauseState {}

export type WatchedTarget = Record<
  TargetType,
  ContractFieldTarget | WalletTarget // | ContractTarget
>;

// export interface ContractTarget {
//   contract_identifier: string;
// }

// export interface ContractTargetUpdate {
//   contract_identifier: string;
// }

export interface ContractFieldTarget {
  contract_identifier: string;
  field_name: string;
}

export interface ContractFieldTargetUpdate {
  contract_identifier: string;
  field_name: string;
}

export enum FieldValues {
  Var = "Var",
  Map = "Map",
  FT = "Ft",
  NFT = "Nft",
}

export interface DataVarSetEventFormattedValue {
  value: string;
  block_index: number;
  event_index: number;
}

export interface DataMapInsertEventFormattedValue {
  inserted_key: string;
  inserted_value: string;
  block_index: number;
  event_index: number;
}

export interface DataMapUpdateEventFormattedValue {
  key: string;
  updated_value: string;
  block_index: number;
  event_index: number;
}

export interface DataMapDeleteEventFormattedValue {
  deleted_key: string;
  block_index: number;
  event_index: number;
}

export interface NFTTransferEventFormattedValue {
  asset_identifier: string;
  sender: string;
  recipient: string;
  block_index: number;
  event_index: number;
}

export interface NFTMintEventFormattedValue {
  asset_identifier: string;
  recipient: string;
  block_index: number;
  event_index: number;
}

export interface NFTBurnEventFormattedValue {
  asset_identifier: string;
  sender: string;
  block_index: number;
  event_index: number;
}

export interface FTTransferEventFormattedValue {
  sender: string;
  recipient: string;
  amount: string;
  block_index: number;
  event_index: number;
}

export interface FTMintEventFormattedValue {
  recipient: string;
  amount: string;
  block_index: number;
  event_index: number;
}

export interface FTBurnEventFormattedValue {
  sender: string;
  amount: string;
  block_index: number;
  event_index: number;
}

export type VarSetEvent = Record<
  StacksTransactionEventType.StacksDataVarSetEvent,
  DataVarSetEventFormattedValue
>;
export type MapInsertEvent = Record<
  StacksTransactionEventType.StacksDataMapInsertEvent,
  DataMapInsertEventFormattedValue
>;
export type MapUpdateEvent = Record<
  StacksTransactionEventType.StacksDataMapUpdateEvent,
  DataMapUpdateEventFormattedValue
>;
export type MapDeleteEvent = Record<
  StacksTransactionEventType.StacksDataMapDeleteEvent,
  DataMapDeleteEventFormattedValue
>;
export type NftMintEvent = Record<
  StacksTransactionEventType.StacksNFTMintEvent,
  NFTMintEventFormattedValue
>;
export type NftTransferEvent = Record<
  StacksTransactionEventType.StacksNFTTransferEvent,
  NFTTransferEventFormattedValue
>;
export type NftBurnEvent = Record<
  StacksTransactionEventType.StacksNFTBurnEvent,
  NFTBurnEventFormattedValue
>;
export type FtMintEvent = Record<
  StacksTransactionEventType.StacksFTMintEvent,
  FTMintEventFormattedValue
>;
export type FtTransferEvent = Record<
  StacksTransactionEventType.StacksFTTransferEvent,
  FTTransferEventFormattedValue
>;
export type FtBurnEvent = Record<
  StacksTransactionEventType.StacksFTBurnEvent,
  FTBurnEventFormattedValue
>;

export interface VarValuesData {
  value: string;
  value_type: ClarityAbiType;
  events: Array<DataVarSetEventFormattedValue>;
  events_page_size: number;
  events_page_index: number;
}

export interface MapValuesData {
  entries: Array<[[string, string], BlockIdentifier, TransactionIdentifier]>;
  entries_page_size: number;
  entries_page_index: number;
  key_type: ClarityAbiType;
  value_type: ClarityAbiType;
  events: Array<MapInsertEvent | MapUpdateEvent | MapDeleteEvent>;
  events_page_size: number;
  events_page_index: number;
}

export interface NftValuesData {
  tokens: Array<[[string, string], BlockIdentifier, TransactionIdentifier]>;
  tokens_page_size: number;
  tokens_page_index: number;
  token_type: any;
  events: Array<NftMintEvent | NftTransferEvent | NftBurnEvent>;
  events_page_size: number;
  events_page_index: number;
}

export interface FtValuesData {
  balances: Array<[[string, string], BlockIdentifier, TransactionIdentifier]>;
  balances_page_size: number;
  balances_page_index: number;
  events: Array<FtMintEvent | FtTransferEvent | FtBurnEvent>;
  events_page_size: number;
  events_page_index: number;
}

export interface ContractFieldVarUpdate {
  value: string;
  changes: Array<ContractFieldVarChange>;
}

export interface ContractFieldVarChange {}

export interface ContractFieldMapUpdate {}

export interface ContractFieldFTUpdate {}

export interface ContractFieldNFTUpdate {}

export interface WalletTarget {
  address: string;
}

export interface WalletTargetUpdate {
  address: string;
}

export enum TargetType {
  // Contract = "Contract",
  ContractField = "ContractField",
  // Wallet = "Wallet",
}

export interface StateExplorerWatchState {
  stacks_block_identifier: BlockIdentifier;
  target: WatchedTarget;
}

export interface RequestQueue {
  nextRequest?: Request;
  poll: boolean;
}

export interface NetworkingState {
  manifestFileWatched?: string;
  protocolData?: ProtocolData;
  bootNetworkStatus?: BootNetworkData;
  devnetStarted: boolean;
  devnetPaused: boolean;
  toggleRequested: boolean;
  mineBlockRequested: boolean;
  discardBlockRequested: boolean;
  protocolIdentifierWatched?: number;
  fieldIdentifierWatched?: [[string, string], BlockIdentifier];
  latestBlockIdentifierKnownByFieldIdentifier: {
    [fieldIdentifier: string]: BlockIdentifier;
  };
  requestNonce: number;
  nextRequest?: any; // todo: add typing
  activities: Array<string>;
}

const initialState: NetworkingState = {
  latestBlockIdentifierKnownByFieldIdentifier: {},
  requestNonce: 0,
  devnetStarted: false,
  devnetPaused: false,
  toggleRequested: false,
  mineBlockRequested: false,
  discardBlockRequested: false,
  activities: [],
};

export const networkingSlice = createSlice({
  name: "networking",
  initialState,
  reducers: {
    initiateBootSequence: (
      state: NetworkingState,
      action: PayloadAction<string>
    ) => {
      if (state.manifestFileWatched !== undefined) {
        return;
      }

      if (state.bootNetworkStatus === undefined) {
        state.fieldIdentifierWatched = undefined;
        state.nextRequest = undefined;
        state.protocolIdentifierWatched = undefined;
        state.manifestFileWatched = action.payload;
      }
    },
    bootNetwork: (state: NetworkingState, action: PayloadAction) => {
      state.devnetStarted = true;
    },
    updateProtocolData: (
      state: NetworkingState,
      action: PayloadAction<ProtocolData>
    ) => {
      if (state.protocolData === undefined) {
        state.protocolData = action.payload;
      }
    },
    updateBootSequence: (
      state: NetworkingState,
      action: PayloadAction<BootNetworkData>
    ) => {
      state.bootNetworkStatus = action.payload;
      if (action.payload.protocol_deployed === true) {
        state.protocolIdentifierWatched = action.payload.protocol_id;
      }
    },
    toggleMining: (state: NetworkingState, action: PayloadAction) => {
      state.devnetPaused = !state.devnetPaused;
      state.toggleRequested = true;
    },
    discardBlock: (state: NetworkingState, action: PayloadAction) => {
      state.discardBlockRequested = true;
    },
    mineBlock: (state: NetworkingState, action: PayloadAction) => {
      state.mineBlockRequested = true;
    },
    updateBlockIdentifierForContractField: (
      state: NetworkingState,
      action: PayloadAction<[string, BlockIdentifier]>
    ) => {
      let [fieldIdentifier, blockIdentifier] = action.payload;
      let knownTip =
        state.latestBlockIdentifierKnownByFieldIdentifier[fieldIdentifier];
      if (knownTip === undefined) {
        state.latestBlockIdentifierKnownByFieldIdentifier[fieldIdentifier] =
          blockIdentifier;
        let [key, _knownTip] = state.fieldIdentifierWatched!;
        state.fieldIdentifierWatched = [key, blockIdentifier];
      } else {
        if (knownTip.hash !== blockIdentifier.hash) {
          state.latestBlockIdentifierKnownByFieldIdentifier[fieldIdentifier] =
            blockIdentifier;
          let [key, knownTip] = state.fieldIdentifierWatched!;
          state.fieldIdentifierWatched = [key, blockIdentifier];
        }
      }
    },
    watchContractField: (
      state: NetworkingState,
      action: PayloadAction<ContractFieldTarget>
    ) => {
      if (state.protocolIdentifierWatched === undefined) {
        return;
      }

      let fieldIdentifier = `${action.payload.contract_identifier}::${action.payload.field_name}`;
      let latestKnownBlock =
        state.latestBlockIdentifierKnownByFieldIdentifier[fieldIdentifier];
      if (latestKnownBlock === undefined) {
        // Starting with block 2 (post-genesis) by default?
        latestKnownBlock = {
          index: 2,
          hash: "",
        };
      }
      state.fieldIdentifierWatched = [
        [action.payload.contract_identifier, action.payload.field_name],
        latestKnownBlock,
      ];
    },
    buildNextRequest: (
      state: NetworkingState,
      action: PayloadAction<number>
    ) => {
      if (state.manifestFileWatched === undefined) {
        state.nextRequest = undefined;
        return;
      }

      if (state.protocolData === undefined) {
        state.nextRequest = {
          protocol_id: 1,
          request: {
            OpenProtocol: {
              manifest_path: state.manifestFileWatched,
            },
          },
        };
        return;
      }

      if (state.devnetStarted === false) {
        state.nextRequest = undefined;
        return;
      }

      if (state.bootNetworkStatus === undefined) {
        state.nextRequest = {
          protocol_id: 1,
          request: {
            BootNetwork: {
              manifest_path: state.manifestFileWatched,
            },
          },
        };
        return;
        // Initiate Call #1
      } else if (state.bootNetworkStatus.protocol_deployed === false) {
        // Initialization still in progress
        state.nextRequest = undefined;
        return;
      } else {
        // Backend is ready, let's continue.
      }

      if (state.protocolIdentifierWatched === undefined) {
        state.nextRequest = undefined;
        return;
      }

      if (
        state.toggleRequested ||
        state.discardBlockRequested ||
        state.mineBlockRequested
      ) {
        let request: NetworkControlCommandData = {
          toggle_auto_mining: state.toggleRequested,
          invalidate_chain_tip: state.discardBlockRequested,
          mine_block: state.mineBlockRequested,
        };

        state.toggleRequested = false;
        state.discardBlockRequested = false;
        state.mineBlockRequested = false;

        state.requestNonce += action.payload;

        state.nextRequest = {
          protocol_id: state.protocolIdentifierWatched,
          nonce: state.requestNonce,
          request: {
            NetworkControl: request,
          },
        };

        return;
      }

      if (state.fieldIdentifierWatched === undefined) {
        // Nothing being watched. Should just be fetching general blocks informations (todo)
        state.nextRequest = undefined;
        return;
      }

      let [[contractIdentifier, fieldName], latestKnownBlockIdentifier] =
        state.fieldIdentifierWatched;

      let request: StateExplorerWatchState = {
        stacks_block_identifier: latestKnownBlockIdentifier,
        target: {
          ContractField: {
            contract_identifier: contractIdentifier,
            field_name: fieldName,
          },
        },
      };

      state.requestNonce += action.payload;

      state.nextRequest = {
        protocol_id: state.protocolIdentifierWatched,
        nonce: state.requestNonce,
        request: {
          StateExplorerWatch: request,
        },
      };
    },
  },
});

function isNetworkReady(bootNetworkStatus?: BootNetworkData): boolean {
  return bootNetworkStatus !== undefined && bootNetworkStatus.protocol_deployed;
}

export const {
  watchContractField,
  updateBlockIdentifierForContractField,
  updateProtocolData,
  updateBootSequence,
  buildNextRequest,
  bootNetwork,
  initiateBootSequence,
  toggleMining,
  discardBlock,
  mineBlock,
} = networkingSlice.actions;

export const selectNetworkBootStatus = (state: RootState) =>
  state.networking.bootNetworkStatus === undefined
    ? undefined
    : state.networking.bootNetworkStatus.protocol_deployed
    ? undefined
    : state.networking.bootNetworkStatus.status;

export const selectIsNetworkHealthy = (state: RootState) =>
  state.networking.bootNetworkStatus === undefined
    ? false
    : state.networking.bootNetworkStatus.protocol_deployed;

export const selectManifestFileWatched = (state: RootState) =>
  state.networking.manifestFileWatched;

export const selectNetworkBooted = (state: RootState) =>
  state.networking.devnetStarted;

export const selectNetworkPaused = (state: RootState) =>
  state.networking.devnetPaused;

export const selectIsManifestLoaded = (state: RootState) =>
  state.networking.protocolData !== undefined;

export const selectProtocolData = (state: RootState) =>
  state.networking.protocolData;

export const selectProtocolName = (state: RootState) =>
  state.networking.protocolData === undefined
    ? "Loading"
    : state.networking.protocolData.protocol_name;

export const selectIsNetworkBooting = (state: RootState) =>
  state.networking.bootNetworkStatus === undefined
    ? false
    : !isNetworkReady(state.networking.bootNetworkStatus);

export const selectNextRequest = (state: RootState) =>
  state.networking.nextRequest;

export default networkingSlice.reducer;
