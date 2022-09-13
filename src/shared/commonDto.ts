
export class modifiedDto {
  modifiedBy: string;
  modifiedAt: Date;
}

export class CommonDto {
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly createdBy: string;
  readonly modified: [modifiedDto];
  // // @ApiProperty({ required: false })
  readonly deletedAt: Date;
  // // @ApiProperty({ required: false })
  readonly deletedBy: string;
}
