export default function getInviteLinkPathFromToken(token: string) {
  return `/invites/${token}`;
}
