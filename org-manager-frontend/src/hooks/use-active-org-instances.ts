import { useQuery } from '@tanstack/react-query';

import { fetchActiveOrgInstances } from '@/lib/api/orgs';
import { queryKeys } from '@/lib/query/keys';
import type { OrgType } from '@/types/domain';
