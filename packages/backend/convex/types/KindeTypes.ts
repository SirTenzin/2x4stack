export interface KindeOrganization {
	code: string;
	roles: string[] | null;
	permissions: string[] | null;
}

export interface KindeUserCreatedData {
	user: {
		email: string;
		first_name: string;
		id: string;
		is_password_reset_requested: boolean;
		is_suspended: boolean;
		last_name: string;
		organizations: KindeOrganization[];
		phone: string | null;
		username: string | null;
	};
}

export interface KindeUserUpdatedData {
	user: {
		id: string;
		phone: string | null;
		last_name: string;
		first_name: string;
		email?: string;
		is_suspended: boolean;
		organizations: KindeOrganization[];
		is_password_reset_requested: boolean;
		username?: string | null;
	};
}

export interface KindeUserDeletedData {
	user: {
		id: string;
	};
}

export interface KindeWebhookPayload {
	data: KindeUserCreatedData | KindeUserUpdatedData | KindeUserDeletedData;
	event_id: string;
	event_timestamp?: string;
	source: string;
	timestamp: string;
	type: 'user.created' | 'user.updated' | 'user.deleted';
}