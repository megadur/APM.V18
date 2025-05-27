export * from './account.service';
import { AccountService } from './account.service';
export * from './invoices.service';
import { InvoicesService } from './invoices.service';
export * from './storeConfiguration.service';
import { StoreConfigurationService } from './storeConfiguration.service';
export const APIS = [AccountService, InvoicesService, StoreConfigurationService];
