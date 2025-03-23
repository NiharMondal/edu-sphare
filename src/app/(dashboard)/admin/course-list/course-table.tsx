"use client";
import { useGetCourseQuery } from "@/redux/api/admin-api/course";
import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import EsModal from "@/components/shared/es-modal";
import {
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import UpdateCourse from "@/components/admin-ui/UpdateCourse";

export default function CourseTable() {
	const { data: courses } = useGetCourseQuery();

	const [isOpen, setIsOpen] = useState(false);
	const openModal = () => {
		setIsOpen(true);
	};
	return (
		<Table>
			<TableCaption>A list of recently created courses.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-primary">Title</TableHead>
					<TableHead className="text-primary">Price</TableHead>
					<TableHead className="text-primary">Instructor</TableHead>
					<TableHead className="text-center text-primary">
						Action
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="text-muted-foreground">
				{courses?.result?.map((course) => (
					<TableRow key={course._id}>
						<TableCell className="font-medium text-accent-foreground">
							{course.title}
						</TableCell>
						<TableCell>{course.price}</TableCell>
						<TableCell>{course.instructor.name}</TableCell>
						<TableCell className="text-center space-y-1 space-x-1">
							<EsModal isOpen={isOpen} setIsOpen={openModal}>
								<DialogTrigger asChild>
									<Button variant="outline">
										<Edit />
										<span>Edit</span>
									</Button>
								</DialogTrigger>
								<DialogContent className="w-full md:max-w-3xl">
									<DialogHeader>
										<DialogTitle>Update Course</DialogTitle>
										<DialogDescription className="sr-only">
											Make changes to your profile here.
										</DialogDescription>
									</DialogHeader>

									<UpdateCourse courseId={course._id} />
								</DialogContent>
							</EsModal>

							<Button size={"sm"} variant={"destructive"}>
								<Trash />
								Delete
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
