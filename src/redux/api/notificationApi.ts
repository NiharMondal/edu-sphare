import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TNotificationResponse } from "@/types/notification.types";

const notificationApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//for admin
		allNotifications: builder.query<
			TServerResponse<TNotificationResponse[]>,
			void
		>({
			query: () => ({
				url: "/notifications",
				method: "GET",
			}),
		}),
		notiFicationByStudentId: builder.query<
			TServerResponse<TNotificationResponse[]>,
			Record<string, string>
		>({
			query: () => ({
				url: "/notifications/student-notification",
				method: "GET",
			}),
		}),
		makeRead: builder.mutation<
			TServerResponse<TNotificationResponse[]>,
			string
		>({
			query: (id) => ({
				url: `/notifications/${id}/read`,
				method: "PATCH",
			}),
		}),
		makeAllRead: builder.mutation<
			TServerResponse<TNotificationResponse[]>,
			void
		>({
			query: () => ({
				url: "/notifications/mark-all-read",
				method: "PATCH",
			}),
		}),
	}),
});

export const {
	useAllNotificationsQuery,
	useNotiFicationByStudentIdQuery,
	useMakeReadMutation,
	useMakeAllReadMutation,
} = notificationApi;
