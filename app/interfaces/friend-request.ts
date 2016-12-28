export interface ICreateFriendInvitationRequest {
  requestee_id: number;
}

export interface IAcceptFriendInvitationRequest {
  id: number;
  params: {
    action_type: string;
    requester_id: number;
  };
}
