import UIText from '@/components/ui/UIText'
import { PrimaryButton } from '@/components/ui/buttons/TextButtons'
import { colors } from '@/constants/colors'
import { useCreateNewGroup } from '@/queries/groups/useCreateNewGroup'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { BlurView } from 'expo-blur'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Platform, StyleSheet, useColorScheme, View } from 'react-native'

interface NewGroupForm {
  groupName: string
}

export default function NewGroupView() {
  const theme = useColorScheme() ?? 'light'
  if (Platform.OS === 'android') {
    return (
      <View style={{ padding: 20, gap: 20, backgroundColor: colors[theme].thickMaterial, borderRadius: 32 }}>
        <Content />
      </View>
    )
  }

  return (
    <BlurView intensity={80} style={{ padding: 20, gap: 20, backgroundColor: 'transparent', borderRadius: 32, overflow: 'hidden' }}>
      <Content />
    </BlurView>
  )
}

function Content() {
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
    createGroup({ groupName: data.groupName })
  }

  return (
    <>
      <View style={{ marginBottom: 30 }}>
        <View style={{ marginBottom: 10 }}>
          <UIText type="largeTitle">Create New Group</UIText>
        </View>
        <View>
          <UIText type="body" color="secondaryLabel">
            Create a group to start swiping with your friends
          </UIText>
        </View>
      </View>
      <View>
        <View style={{ marginBottom: 8, marginLeft: 12 }}>
          <UIText type="calloutEmphasized">Group Name</UIText>
        </View>
        <Controller
          control={control}
          name="groupName"
          rules={{ required: 'Group name is required' }}
          render={({ field: { onChange, value } }) => (
            <BottomSheetTextInput
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
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  bottomButton: {
    width: '100%',
  },
})
