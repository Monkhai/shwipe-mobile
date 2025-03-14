import UIText from '@/components/ui/UIText'
import { PrimaryButton } from '@/components/ui/buttons/Buttons'
import { colors } from '@/constants/colors'
import { useCreateNewGroup } from '@/queries/groups/useCreateNewGroup'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, Pressable, StyleSheet, TextInput, useColorScheme, View } from 'react-native'

interface NewGroupForm {
  groupName: string
}

interface Props {
  onSuccess: () => void
}
export default function NewGroupView({ onSuccess }: Props) {
  const theme = useColorScheme() ?? 'light'
  const { mutate: createGroup, isPending } = useCreateNewGroup()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewGroupForm>({
    defaultValues: {
      groupName: '',
    },
  })

  const onSubmit = (data: NewGroupForm) => {
    createGroup({ groupName: data.groupName }, { onSuccess: onSuccess })
  }

  return (
    <Pressable style={{ flex: 1, gap: 4 }} onPress={Keyboard.dismiss}>
      <UIText type="largeTitle">Create New Group</UIText>
      <View style={{ gap: 8 }}>
        <UIText type="body" color="secondaryLabel">
          Create a group to start swiping with your friends
        </UIText>
        <View style={{ marginLeft: 12 }}>
          <UIText type="calloutEmphasized">Group Name</UIText>
        </View>
        <Controller
          control={control}
          name="groupName"
          rules={{ required: 'Group name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors[theme].material,
                  color: colors[theme].label,
                },
              ]}
              placeholder="Ex. Sea Food Diet"
              placeholderTextColor={colors[theme].secondaryLabel}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.groupName && (
          <View style={{ marginTop: 4 }}>
            <UIText type="caption" color="danger">
              {errors.groupName.message || 'Group name is required'}
            </UIText>
          </View>
        )}
      </View>
      <View style={styles.bottomButton}>
        <PrimaryButton
          type="primary"
          textType="bodyEmphasized"
          text={isPending ? 'Creating...' : 'Create Group'}
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending}
          style={{ borderRadius: 12 }}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  bottomButton: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
})
