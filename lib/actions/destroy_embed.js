import { canManage } from "../perms.js";
import { deleteAttachment } from "../moderation.js";

export default {
  actionId: "destroy_embed",

  async execute({ ack, body, action, client, context, logger }) {
    await ack();

    const { channel, ts } = JSON.parse(body.view.private_metadata);
    const attachmentId = action.value;

    if (!(await canManage(context.userClient, body.user.id, channel))) {
      logger.warn(`${body.user.id} denied for manage_embed_destroy`);
      return;
    }

    await deleteAttachment(channel, ts, attachmentId);
  },
};
